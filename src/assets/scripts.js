var f = new Date();

$(function() {
  $('[data-toggle="datepicker"]').datepicker({
    autoHide: true,
    zIndex: 2048,
    format: 'dd/mm/yyyy',
    startView: 2,
    startDate: '01/01/1900',
    endDate: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
  });
});
