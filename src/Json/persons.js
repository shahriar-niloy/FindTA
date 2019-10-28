const persons = [
  { 
    id: 1,
    name: "Al Shahriar Niloy",
    phone: "01674562802",
    email: "shahriar_niloy@outlook.com",
    faculty: "Md. Mohsin Uddin",
    picture: "/images/cynth.jpg",
    post: "Undergraduate Teaching Assistant",
    oh: [
      ["Sunday", "Office Hour", "Class", "", "Office Hour", "", ""],
      ["Monday", "Class", "Office Hour", "Office Hour", "", "", ""],
      ["Tuesday", "Class", "", "Class", "Office Hour", "Office Hour", "Office Hour"],
      ["Wednesday", "Class", "", "Class", "Office Hour", "", ""],
      ["Thursday", "", "Class", "Office Hour", "Office Hour", "Class", ""]
    ]
  },
  {
    id: 2,
    name: "Afsana Hossain",
    phone: "01674562802",
    email: "afsana@gmail.com",
    faculty: "Md. Mohsin Uddin",
    post: "Undergraduate Teaching Assistant",
    oh: [
      ["Sunday", "Class", "Class", "Office Hour", "Office Hour", "", ""],
      ["Monday", "", "Office Hour", "Class", "Class", "", ""],
      ["Tuesday", "Class", "Office Hour", "Office Hour", "Office Hour", "Office Hour", ""],
      ["Wednesday", "Class", "Class", "", "Office Hour", "", ""],
      ["Thursday", "", "Class", "Office Hour", "", "", ""]
    ]
  }
];

export const getPersons = () => {
    return persons;
};