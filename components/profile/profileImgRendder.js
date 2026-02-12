function profileImgRendder(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("profile-image").src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}
