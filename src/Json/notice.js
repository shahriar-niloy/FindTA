const notice = [
    {
        id: 1,
        courseCode: "CSE110",
        sec: 10,
        date: "14 August 2019",
        subject: "No class today",
        text: "There will be no class today"
    },
    {
        id: 2,
        courseCode: "CSE110",
        sec: 10,
        date: "14 August 2019",
        subject: "Lab Cancelled",
        text: "There will be no lab today"
    }
];

export const getNotice = () => {
    return notice; 
}
