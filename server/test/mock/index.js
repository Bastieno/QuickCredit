// Mock data for userController
const login = {
  userLogin: {
    email: 'baz@gmail.com',
    password: 'ogochukwu24',
  },
  adminLogin: {
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
  },
  wrongEmailFormat: {
    email: 'blah@wrongdomain',
    password: 'sad',
  },
  wrongPassword: {
    email: 'fnduamaka@gmail.com',
    password: 'sad',
  },
  nonExistingLogin: {
    email: 'bassman@gmail.com',
    password: 'inflames',
  },
  missingEmailLogin: {
    password: 'correctPassword',
  },
  missingPasswordLogin: {
    email: 'baz@gmail.com',
  },
};

const signUp = {
  validNewUser: {
    email: 'amarachi@gmail.com',
    firstName: 'Amara',
    lastName: 'Okoye',
    password: 'mara23',
    address: 'Km 18 Airport Road, Galadimawa, Abuja',
  },
  validNewUser1: {
    email: 'uju@gmail.com',
    firstName: 'Ujunwa',
    lastName: 'Nduamaka',
    password: 'beautiful',
    address: 'Km 20 Airport Road, Galadimawa, Abuja',
  },
  missingFirstName: {
    lastName: 'Nduamaka',
    password: 'chisom15',
    email: 'fnduamaka@gmail.com',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  missingLastName: {
    firstName: 'Francis',
    password: 'chisom15',
    email: 'fnduamaka@gmail.com',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  missingEmail: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  missingAddress: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
  },
  missingPassword: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamaka@gmail.com',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  unsupportedFirstName: {
    firstName: '258vdvhkashka',
    lastName: 'Francis',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  unsupportedLastName: {
    firstName: 'Francis',
    lastName: '65488+vvs',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  unsupportedAddresFormat: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: '@ area 10 & Abuja',
  },
  invalidEmail: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamaka@yahoo',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  shortAddress: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: 'Anambra',
  },
  longAddress: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: new Array(257).join('a'),
  },
  shortFirstName: {
    firstName: 'F',
    lastName: 'Nduamaka',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  longFirstName: {
    firstName: new Array(52).join('a'),
    lastName: 'Nduamaka',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  shortLastName: {
    firstName: 'Francis',
    lastName: 'N',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  longLastName: {
    firstName: 'Francis',
    lastName: new Array(52).join('a'),
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  shortPassword: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamak@gmail.com',
    password: '11111',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  longPassword: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamak@gmail.com',
    password: new Array(102).join('a'),
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
  duplicateEmail: {
    firstName: 'Francis',
    lastName: 'Nduamaka',
    email: 'fnduamaka@gmail.com',
    password: 'chisom15',
    address: 'Km 10 Airport Road, Galadimawa, Abuja',
  },
};

const resetPassword = {
  registeredUser: {
    email: 'fnduamaka@gmail.com',
    passwword: 'chisom15',
    newPassword: 'francis24',
  },
  unregisteredUser: {
    email: 'kamara@gmail.com',
    newPassword: 'kmara23',
  },
  missingEmail: {
    newPassword: '12457895',
  },
  missingPassword: {
    email: 'chisom@gmail.com',
  },
  invalidEmail: {
    email: 'fnduamaka@yahoo',
    newPassword: 'chisom15',
  },
  shortPassword: {
    email: 'baz@gmail.com',
    newPassword: '12345',
  },
  longPassword: {
    email: 'uche@gmail.com',
    newPassword: new Array(102).join('a'),
  },
};

// Mock data for loanController
const createLoan = {
  validLoan: {
    email: 'baz@gmail.com',
    firstName: 'Bastieno',
    lastName: 'Nduamaka',
    amount: '50000',
    tenor: '6',
  },
  invalidLoan: {
    email: 'amarachi@gmail.com',
    firstName: '',
    lastName: 'O',
    amount: '5000',
    tenor: '15',
  },
  conflictLoan: {
    email: 'uche@gmail.com',
    firstName: 'Uche',
    lastName: 'Njoku',
    amount: '50000',
    tenor: '6',
  },
  differentEmail: {
    email: 'amara@gmail.com',
    firstName: 'Bastieno',
    lastName: 'Nduamaka',
    amount: '50000',
    tenor: '6',
  },
  differentFirstName: {
    email: 'baz@gmail.com',
    firstName: 'Peter',
    lastName: 'Nduamaka',
    amount: '50000',
    tenor: '6',
  },
  differentLastName: {
    email: 'baz@gmail.com',
    firstName: 'Bastieno',
    lastName: 'Ndu',
    amount: '50000',
    tenor: '6',
  },
};

const statusUpdate = {
  validStatus: {
    status: 'approved',
  },
  invalidStatus: {
    status: 'incorrect',
  },
};

// Mock data for repaymentController
const createRepaymentRecord = {
  validPaidAmount: {
    paidAmount: '10800.33',
  },
  invalidPaidAmount: {
    paidAmount: '12s589',
  },
  largePaidAmount: {
    paidAmount: '600000.00',
  },
  smallDiff: {
    paidAmount: '65000.00',
  },
};


export default {
  login,
  signUp,
  resetPassword,
  createLoan,
  statusUpdate,
  createRepaymentRecord,
};
