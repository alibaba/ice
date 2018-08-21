// tasks list for Tasks card in Dashboard view

const tasks = [
  {
    checked: true,
    text: 'Sign contract for "What are conference organizers afraid of?"',
  },
  {
    checked: false,
    text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
  },
  {
    checked: true,
    text:
      'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
  },
];

// table head data and table body data for Tables view

const thead = ['Name', 'Country', 'City', 'Salary'];
const tbody = [
  {
    className: 'table-success',
    data: ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
  },
  {
    className: '',
    data: ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
  },
  {
    className: 'table-info',
    data: ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
  },
  {
    className: '',
    data: ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
  },
  {
    className: 'table-danger',
    data: ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
  },
  { className: '', data: ['Mason Porter', 'Chile', 'Gloucester', '$78,615'] },
  {
    className: 'table-warning',
    data: ['Jon Porter', 'Portugal', 'Gloucester', '$98,615'],
  },
];

export {
  tasks, // tasks list for Tasks card in Dashboard view
  thead, // data for <thead> of table in TableList view
  tbody, // data for <tbody> of table in TableList view
};
