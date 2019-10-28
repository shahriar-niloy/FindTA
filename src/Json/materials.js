const materials = [
    {
        id: 1,
        title: "Java",
        mats: [
            {
                label: "Course Outline",
                url: "#"
            },
            {
                label: "Course Folder",
                url: "https://www.google.com/"
            }
        ]
    },
    {
        id: 2,
        title: "Software Engeneering",
        mats: [
            {
                label: "Course Outline",
                url: "#"
            },
            {
                label: "Course Folder",
                url: "https://www.google.com/"
            }
        ]
    },
    {
        id: 3,
        title: "Machine Learning",
        mats: [
            {
                label: "Course Outline",
                url: "#"
            },
            {
                label: "Course Folder",
                url: "https://www.google.com/"
            }
        ]
    }
]

export const getMaterials = () => {
    return materials;
}

export const getCourseMaterials = (id) => {
    const course = materials.find((course) => course.id === id);
    console.log("Find");
    console.log(course);
    return course; 
}