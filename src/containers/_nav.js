const _nav = [
  {
    name: "Home",
    to: "/dashboard",
    icon: <i className="fa fa-home" />,
    _chlidrens: [],
  },
  // {
  //   name: "Users",
  //   to: "/users",
  //   icon: <i className="fa fa-users" aria-hidden="true"></i>,
  //   _chlidrens: [],
  // },
  // {
  //   name: "Permission Groups",
  //   to: "/persmissions",
  //   icon: <i className="fa fa-unlock-alt" aria-hidden="true"></i>,
  //   _chlidrens: [],
  // },
  // {
  //   name: "Daily Task",
  //   to: "/dailytask",
  //   icon: <i className="icon-speedometer menu-icon" />,
  //   _chlidrens: [],
  // },
  
  {
    name: "Add User",
    to: "/users/add-user",
    icon: <i className="fa fa-user-plus" aria-hidden="true"></i>,
    _chlidrens: [],
  },
  {
    name: "Users",
    to: "/users",
    icon: <i className="fa fa-users" aria-hidden="true"></i>,
    _chlidrens: [
      { name: "New Registered", to: "/users/newregistrations" },
      { name: "All Users", to: "/users/allusers" }
    ],
  },
  {
    name: "Wallet",
    to: "/wallet",
    icon: <i className="fa fa-suitcase" aria-hidden="true"></i>,
    _chlidrens: [],
  },
  {
    name: "Reports",
    to: "/reports",
    icon: <i className="fa fa-file-text-o" aria-hidden="true"></i>,
    _chlidrens: [
      { name: "Paid Users", to: "/reports/paidusers" },
      { name: "Unpaid Users", to: "/reports/unpaidusers" },
      { name: "Wallet", to: "/reports/wallethistory" }
    ],
  },
  // {
  //   name: "Exams",
  //   to: "/templates",
  //   icon: <i className="fa fa-file-o" aria-hidden="true"></i>,
  //   _chlidrens: [
  //     { name: "Add Exam", to: "/exam/create" },
  //     { name: "All Exams", to: "/exams" }
  //   ],
  // },
  // {
  //   name: "Exam Templates",
  //   to: "/templates",
  //   icon: <i className="fa fa-file-o" aria-hidden="true"></i>,
  //   _chlidrens: [
  //     { name: "Create Template", to: "/templates/create" },
  //     { name: "All Templates", to: "/templates" }
  //   ],
  // },
  // {
  //   name: "Master",
  //   to: "/stock/brands",
  //   icon: <i className="fa fa-indent" aria-hidden="true"></i>,
  //   _chlidrens: [
  //     { name: "Courses", to: "/master/courses" },
  //     { name: "Departments", to: "/master/departments" },
  //     { name: "Class", to: "/master/classes" },
  //     { name: "Semesters", to: "/master/semesters" },
  //     { name: "Subjects", to: "/master/subjects" }
  //   ],
  // },
  // {
  //   name: "Setting",
  //   to: "/settings",
  //   icon: <i className="fa fa-cog" aria-hidden="true"></i>,
  //   _chlidrens: [],
  // },
];

export default _nav;
