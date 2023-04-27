import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptVehicle from '../adapter/adaptVehicle';
import SupplierRepository from '../../Supplier/repository/SupplierRepository';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import requestPost from '../../core/api/requestPost';
import prepareVehicle from '../adapter/prepareVehicle';
import requestPatch from '../../core/api/requestPatch';
import Vehicle from '../entity/Vehicle';

export default {
  find(id) {
    return promesify(async () => {
      const { data: vehicle, error } = await requestGet(`/vehicles/${id}`, {
        adapt: adaptVehicle,
      }).promise();

      if (error) {
        return {
          error,
        };
      }

      const { data: supplier, error: error2 } = await SupplierRepository.find(vehicle.supplier.id).promise();

      if (error2) {
        return {
          error: error2,
        };
      }

      vehicle.supplier = supplier;

      return {
        data: vehicle,
      };
    });
  },

  findBy(qs = []) {
    return promesify(async () => {
      const { data, error, ...rest } = await requestGet(`/vehicles`, {
        qs,
        adapt: adaptVehicle,
      }).promise();

      if (error) return { error, ...rest };

      const supplierIds = data.map((eachVehicle) => eachVehicle.supplier.id).filter((e, i, a) => a.indexOf(e) === i);
      const suppliers = (await Promise.all(supplierIds.map((eachId) => SupplierRepository.find(eachId).promise()))).map(
        (each) => each.data
      );

      const newData = data.map((eachVehicle) => {
        eachVehicle.supplier = suppliers.find((eachSupplier) => eachSupplier.id === eachVehicle.supplier.id);
        return eachVehicle;
      });

      return { data: newData, ...rest };
    });
  },

  findBySupplierId(supplierId, qs = []) {
    return this.findBy([['filter_by[supplier_id]', supplierId], ...qs]);
  },

  findAllBySupplierId(supplierId, qs = []) {
    return resolveAllPagesGet('/vehicles', {
      qs: [...qs, ['filter_by[supplier_id]', supplierId]],
      adapt: adaptVehicle,
    });
  },

  findVehicleCertificationById(id) {
    return requestGet(`/vehicle-certification/${id}`, {
      adapt: (vehicleCertification) => {
        return {
          id: vehicleCertification.id,
          certification_values: vehicleCertification.certification_values.map((eachValue) => {
            return {
              value: eachValue.id,
              label: eachValue.value,
            };
          }),
          certification_name: vehicleCertification.certification_name,
        };
      },
    });
  },

  create(vehicle: Vehicle) {
    return requestPost('/vehicles', {
      data: prepareVehicle(vehicle),
    });
  },

  update(vehicle: Vehicle) {
    return requestPatch(`/vehicles/${vehicle.id}`, {
      data: prepareVehicle(vehicle),
    });
  },

  save(vehicle: Vehicle) {
    if (vehicle.isRemotelyCreated()) {
      return this.update(vehicle);
    }

    return this.create(vehicle);
  },

  delete(vehicleId: string) {
    return requestPatch(`/vehicles/${vehicleId}/delete`);
  },
};
