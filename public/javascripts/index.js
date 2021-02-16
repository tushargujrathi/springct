function getUsers() {
  dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        url: '/getUsers',
        dataType: 'json',
      },
    },
    schema: {
      data: function (data) {
        return data.data;
      },
      model: {
        fields: {
          name: { field: 'name', type: 'string' },
        },
      },
    },
    batch: true,
    pageSize: 10,
  });

  $('#usergrid').kendoGrid({
    dataSource: dataSource,
    columnMenu: {
      filterable: false,
    },
    pageable: true,
    sortable: true,
    navigatable: true,
    resizable: false,
    reorderable: false,
    groupable: false,
    filterable: true,
    columns: [
      {
        field: 'name',
        title: 'Name',
        width: 105,
      },
      {
        field: 'email',
        title: 'Email',
        width: 105,
      },
      {
        field: 'phone',
        title: 'Phone',
        width: 105,
      },
      {
        field: 'company',
        title: 'Companies',
        width: 105,
      },
    ],
  });
}

function addUser() {
  const obj = {};
  const name = $('#name').val();
  if (!name) {
    $('#name').focus();
    $('#name_error').removeClass('hide');
    return false;
  }
  $('#name_error').addClass('hide');
  obj.name = name;

  const email = $('#email').val();
  if (!email) {
    $('#email').focus();
    $('#email_error').removeClass('hide');
    return false;
  }
  $('#email_error').addClass('hide');
  obj.email = email;

  const phone = $('#phone').val();
  if (!phone) {
    $('#phone').focus();
    $('#phone_error').removeClass('hide');
    return false;
  }
  $('#phone_error').addClass('hide');
  obj.phone = phone;

  const company = [];

  $('#company :selected').each(function (i, sel) {
    company.push($(sel).val());
  });

  if (company.length === 0) {
    $('#company').focus();
    $('#company_error').removeClass('hide');
    // return false;
  }
  $('#company_error').addClass('hide');
  obj.company = company;

  $.ajax({
    url: '/saveUser',
    data: obj,
    method: 'POST',
    success(response) {
      if (response.status === 0) {
        M.toast({ html: 'User Saved Successfully!' }, 5000);
        $('#addUserModal').modal('close');
        getUsers();
        return false;
      }
      M.toast({ html: 'Error While Saving!' }, 5000);
      return false;
    },
    error() {
      M.toast({ html: 'Error While Saving!' }, 5000);
      return false;
    },
  });
}

function addCompany() {
  const obj = {};
  const companyName = $('#companyName').val();
  if (!companyName) {
    $('#companyName').focus();
    $('#companyName_error').removeClass('hide');
    return false;
  }
  $('#companyName_error').addClass('hide');
  obj.companyName = companyName;

  const city = $('#city').val();
  if (!city) {
    $('#city').focus();
    $('#city_error').removeClass('hide');
    return false;
  }
  $('#city_error').addClass('hide');
  obj.city = city;

  $.ajax({
    url: '/saveCompany',
    data: obj,
    method: 'POST',
    success(response) {
      if (response.status === 0) {
        M.toast({ html: 'Company Saved Successfully!' }, 5000);
        $('#addCompanyModal').modal('close');
        getCompany();
        getCompanyForDropdown;
        return false;
      }
      M.toast({ html: 'Error While Saving!' }, 5000);
      return false;
    },
    error() {
      M.toast({ html: 'Error While Saving!' }, 5000);
      return false;
    },
  });
}

function getCompany() {
  dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        url: '/getCompanies',
        dataType: 'json',
      },
    },
    schema: {
      data: function (data) {
        return data.data;
      },
      model: {
        fields: {
          name: { field: 'name', type: 'string' },
        },
      },
    },
    batch: true,
    pageSize: 10,
  });

  $('#companygrid').kendoGrid({
    dataSource: dataSource,
    columnMenu: {
      filterable: false,
    },
    pageable: true,
    sortable: true,
    navigatable: true,
    resizable: false,
    reorderable: false,
    groupable: false,
    filterable: true,
    columns: [
      {
        field: 'companyName',
        title: 'Name',
        width: 105,
      },
      {
        field: 'city',
        title: 'City',
        width: 105,
      },
    ],
  });
}

function getCompanyForDropdown() {
  $.ajax({
    url: '/getCompanies',
    method: 'get',
    success(response) {
      if (response.status === 0) {
        let html = '<option value="" disabled>Choose your option</option>';
        response.data.forEach((x) => {
          html += `<option value="${x.companyName}">${x.companyName}</option>`;
        });
        $('#company').html(html);
        $('select').formSelect();
        return false;
      }
      M.toast({ html: 'Error While Saving!' }, 5000);
      return false;
    },
    error() {
      M.toast({ html: 'Error While Saving!' }, 5000);
      return false;
    },
  });
}

$(document).ready(() => {
  $('.tabs').tabs();
  $('.modal').modal();
  $('select').formSelect();
  getUsers();
  getCompany();
  getCompanyForDropdown();
});

$(document).on('click', '#addUser', () => {
  $('#addUserModal').modal('open');
});

$(document).on('click', '#addCompany', () => {
  $('#addCompanyModal').modal('open');
});

$(document).on('click', '#saveUser', () => {
  addUser();
});

$(document).on('click', '#saveCompany', () => {
  addCompany();
});
