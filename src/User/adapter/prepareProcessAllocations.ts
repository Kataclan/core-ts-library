export default function prepareProcessAllocations({ allocations, filename, subject, template }) {
  return {
    template: {
      email_template: template,
      email_subject: subject,
    },
    filename,
    data: allocations,
  };
}
