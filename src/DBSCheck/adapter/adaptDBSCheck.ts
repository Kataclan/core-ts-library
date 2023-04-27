import DBSCheckUK from '../entity/DBSCheckUK';
import DateTimeZone from '../../DateTimeZone/entity/DateTimeZone';

export default function adaptDBSCheck(json: any): DBSCheckUK {
  if (!json) {
    return null;
  }

  return adaptDBSCheckUK(json);
}

function adaptDBSCheckUK(json): DBSCheckUK {
  const ukDBSCheck = new DBSCheckUK();
  ukDBSCheck.issuedDate = DateTimeZone.fromString(json.issued_date);
  ukDBSCheck.expiryDate = DateTimeZone.fromString(json.expiry_date);
  ukDBSCheck.safeguardCertificateDate = DateTimeZone.fromString(json.safeguard_certificate_date);
  ukDBSCheck.certificateType = json.certificate_type;
  ukDBSCheck.certificateNumber = json.certificate_number;

  return ukDBSCheck;
}
