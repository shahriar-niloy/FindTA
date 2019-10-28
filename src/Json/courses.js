const courses = [
    {
        id: 1,
        code: "CSE110",
        title: "Java",
        sec: 10,
        timeSlot: "SR 10:10 - 11:40",
        pic: "/images/java.jpg"
    },
    {
        id: 2,
        code: "CSE411",
        title: "Software Engeneering",
        sec: 3,
        timeSlot: "TW 10:10 - 11:40",
        pic: "/images/se.jpg"
    },
    {
        id: 3,
        code: "CSE475",
        title: "Machine Learning",
        sec: 1,
        timeSlot: "MW 1:30 - 03:00",
        pic: "/images/ml.jpg"
    }
];

export const getCourses = () => {
    return courses;
}