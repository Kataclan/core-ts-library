import DBSCheckUK from '../entity/DBSCheckUK';
import prepareDateTimeZone from '../../DateTimeZone/adapter/prepareDateTimeZone';

export default function prepareDBSCheck(dbsCheck: DBSCheckUK): any {
  if (!dbsCheck) {
    return null;
  }

  return prepareDBSCheckUK(dbsCheck);
}

function prepareDBSCheckUK(dbsCheck: DBSCheckUK): any {
  if (dbsCheck.isEmpty()) {
    return null;
  }

  return {
    issued_date: prepareDateTimeZone(dbsCheck.issuedDate),
    expiry_date: prepareDateTimeZone(dbsCheck.expiryDate),
    safeguard_certificate_date: prepareDateTimeZone(dbsCheck.safeguardCertificateDate),
    certificate_type: dbsCheck.certificateType,
    certificate_number: dbsCheck.certificateNumber,
  };
}
