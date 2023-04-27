import promesify from '../../core/utils/promesify';
import requestGet from '../../core/api/requestGet';
import adaptDriver from '../adapter/adaptDriver';
import resolveAllPagesGet from '../../core/utils/resolveAllPagesGet';
import requestPost from '../../core/api/requestPost';
import prepareDriver from '../adapter/prepareDriver';
import requestPatch from '../../core/api/requestPatch';
import SupplierRepository from '../../Supplier/repository/SupplierRepository';
import prepareJourneyVehicleTrackingPoint from '../adapter/prepareJourneyVehicleTrackingPoint';
import adaptDateTimeZone from '../../DateTimeZone/adapter/adaptDateTimeZone';
import Driver from '../entity/Driver';

export default {
  find(id) {
    return promesify(async () => {
      const { data: driver, error } = await requestGet(`/drivers/${id}`, {
        adapt: adaptDriver,
      }).promise();

      if (error) {
        return {
          ...error,
        };
      }

      const { data: supplier } = await SupplierRepository.find(driver.supplier.id).promise();
      driver.supplier = supplier;

      return {
        data: driver,
      };
    });
  },

  findBy(qs = []) {
    return promesify(async () => {
      const { data, error, ...rest } = await requestGet('/drivers', {
        qs,
        adapt: adaptDriver,
      }).promise();

      if (error) return { error, ...rest };

      const supplierIds = data.map((eachDriver) => eachDriver.supplier.id).filter((e, i, a) => a.indexOf(e) === i);
      const suppliers = (await Promise.all(supplierIds.map((eachId) => SupplierRepository.find(eachId).promise()))).map(
        (each) => each.data
      );

      const newData = data.map((eachDriver) => {
        eachDriver.supplier = suppliers.find((eachSupplier) => eachSupplier.id === eachDriver.supplier.id);
        return eachDriver;
      });

      return { data: newData, ...rest };
    });
  },

  findBySupplierId(supplierId, qs = []) {
    return this.findBy([['filter_by[supplier_id]', supplierId], ...qs]);
  },

  findAllBySupplierId(supplierId, qs = []) {
    return resolveAllPagesGet('/drivers', {
      qs: [...qs, ['filter_by[supplier_id]', supplierId]],
      adapt: adaptDriver,
    });
  },

  create(driver: Driver) {
    return requestPost('/drivers', {
      data: prepareDriver(driver),
    });
  },

  update(driver: Driver) {
    return requestPatch(`/drivers/${driver.id}`, {
      data: prepareDriver(driver),
    });
  },

  save(driver: Driver) {
    if (driver.isRemotelyCreated()) {
      return this.update(driver);
    }

    return this.create(driver);
  },

  delete(driverId: string) {
    return requestPatch(`/drivers/${driverId}/delete`);
  },

  moveDriverVehicleByPhone(data, config) {
    return requestPost(`/driver/journey-vehicle/by-phone-number`, {
      data: prepareJourneyVehicleTrackingPoint(data),
      ...config,
    });
  },

  impersonateDriverToken(journeyVehicleId) {
    return requestPost(`/driver/impersonate/${journeyVehicleId}`);
  },

  getLastLocation(driverCode) {
    return requestGet(`/driver/${driverCode}/last-location`, {
      adapt: (json) => {
        if (!json) return null;

        const { position, eta_updated_with_accuracy } = json;

        return { ...position, time: adaptDateTimeZone(position?.time), eta_updated_with_accuracy };
      },
    });
  },
};
