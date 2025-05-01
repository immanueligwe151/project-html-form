const imageInput = document.getElementById("pictures");
const quoteForm = document.getElementById("quoteForm");
const maxFiles = 3;
let selectedFiles = [];

imageInput.addEventListener("change", (event) => {
    const newFiles = Array.from(event.target.files);

    for (let file of newFiles) {
        if (selectedFiles.length >= maxFiles) {
            alert("You can only upload up to 3 images.");
            break;
        }

        // to avoid adding duplicate images
        if (!selectedFiles.find(f => f.name === file.name && f.lastModified === file.lastModified)) {
            selectedFiles.push(file);
        }
    }

    alert(displaySelectedFileNames());
});

function displaySelectedFileNames() {
    let display = selectedFiles.map(f => f.name).join(', ');
    return "Selected files: " + display;
}


quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
        alert("Please upload at least one image.");
        return;
    }

    const formData = new FormData(quoteForm);
    formData.append("part_number", quoteForm.part_number.value);
    formData.append("manufacturer", quoteForm.manufacturer.value);
    formData.append("quantity", quoteForm.quantity.value);
    formData.append("required_when", quoteForm.required_when.value);

    // appends each selected file manually
    selectedFiles.forEach((file, index) => {
        formData.append(`picture_${index}`, file);
    });

    // logic for file upload

    
});
