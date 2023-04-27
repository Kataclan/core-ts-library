import Driver from '../entity/Driver';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';
import DBSValidCertificateType from '../../DBSCheck/enum/DBSValidCertificateType';
import promesify from '../../core/utils/promesify';
import Market from '../../Market/entity/Market';
import Supplier from '../../Supplier/entity/Supplier';

type createDriverProps = {
  firstName?: string;
  lastName?: string;
  marketId?: string;
  supplierName?: string;
  activateDBSCheck?: boolean;
  dbsCertificateIssuedDate?: string;
  dbsCertificateType?: DBSValidCertificateType;
  dbsCertificateNumber?: any;
};

function createDriver({
  firstName = 'Good',
  lastName = 'Driver',
  marketId = Market.UK,
  supplierName = 'Finn Coaches',
  activateDBSCheck = true,
  dbsCertificateIssuedDate = '20211129144145 Europe/London',
  dbsCertificateType = DBSValidCertificateType.BASIC,
  dbsCertificateNumber = Math.floor(Math.random() * 1000000),
}: createDriverProps): Driver {
  const driver = new Driver();
  driver.first_name = firstName;
  driver.last_name = lastName;

  driver.market = new Market();
  driver.market.id = marketId;
  driver.market.uuid.id = marketId;

  driver.supplier = new Supplier();
  driver.supplier.name = supplierName;

  if (activateDBSCheck) {
    driver.activateDBSCheck();

    if (dbsCertificateIssuedDate) {
      driver.dbsCheck.issuedDate = DateTimeZone.fromString(dbsCertificateIssuedDate);
      driver.dbsCheck.calculateExpiryDate();
    }

    driver.dbsCheck.certificateType = dbsCertificateType;
    driver.dbsCheck.certificateNumber = dbsCertificateNumber;
    driver.dbsCheck.safeguardCertificateDate = null;
  }

  return driver;
}

export default {
  findBy() {
    return promesify(async () => {
      return {
        data: [
          createDriver({
            dbsCertificateType: DBSValidCertificateType.BASIC,
          }),
          createDriver({
            dbsCertificateType: DBSValidCertificateType.STANDARD,
          }),
          createDriver({
            dbsCertificateType: DBSValidCertificateType.ENHANCED,
          }),
          createDriver({
            dbsCertificateType: DBSValidCertificateType.ENHANCED,
            dbsCertificateIssuedDate: null,
          }),
          createDriver({
            dbsCertificateType: DBSValidCertificateType.ENHANCED,
            dbsCertificateIssuedDate: null,
          }),
          createDriver({
            dbsCertificateType: null,
          }),
          createDriver({
            dbsCertificateNumber: null,
          }),
          createDriver({
            dbsCertificateIssuedDate: '20181202090000 Europe/London',
          }),
        ],
      };
    });
  },
};
