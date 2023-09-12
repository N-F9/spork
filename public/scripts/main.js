// const form = document.getElementById("upload")

// const submitForm = (e) => {
// 	e.preventDefault();
// 	const folder = document.getElementById("folder");
// 	const formData = new FormData();
// 	for(let i =0; i < folder.files.length; i++) {
// 		formData.append("files", folder.files[i]);
// }
// 	fetch("/website", {
// 			method: 'POST',
// 			body: formData,
// 			headers: {
// 				"Content-Type": "multipart/form-data"
// 			}
// 	})
// 			.then((res) => console.log(res))
// 			.catch((err) => ("Error occured", err));
// }

// form.addEventListener("submit", submitForm)
