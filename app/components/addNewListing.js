// Fix listings data: 
//combine react native + redux to achieve real time update !!!

// Fix account data:
//using context + hooks 

const newLink = (image) => {
    return { url: image }
}

export default function addNewListing(values) {
    const newProperty = {
        id: Math.random(),
        userId: values.userId,
        title: values.title,
        type: values.category.label,
        favourite: false,
        details: {
            price: values.price,
            size: values.size,
            rooms: values.rooms,
            address: values.address,
        },
        images: values.images.map(image => newLink(image)),
        contact: {
            image: values.gender.value,
            name: values.gender.label + ' ' + values.firstName + ' ' + values.lastName,
            company: values.company,
            phone: values.phone,
            email: values.email,
        },
        info: {
            description: values.description,
        }
    }

    return newProperty;
}


