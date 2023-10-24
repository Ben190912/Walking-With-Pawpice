//---------- Sandwhich layer ----------//

//When users click on the "sandwhich" button, show the curtain layer
function openNav() {
    //Find the HTML element "myNav" and set display to block. This shows the curtain layer
  document.getElementById("myNav").style.display = "block";
}

//When users click on the "X", close the curtain layer
function closeNav() {
    //Find the HTML element "myNav" and set display to none
  document.getElementById("myNav").style.display = "none";
}


//---------- Expanding the walk area image ----------//

//When users click the image of "leashed" and "off-leashed" areas, the image expands to be seen bigger
function openImageOverlay() {
  //Find the HTML element "imageExpanded" and set display to block.
document.getElementById("imageExpanded").style.display = "block";
}

//When users click on the "X", close the expanded image
function closeImageOverlay() {
  //Find the HTML element "imageExpanded" and set display to none
document.getElementById("imageExpanded").style.display = "none";
}





//----------- Form -----------//

//Due to having a free email.js account, attachments are not allowed, I have opted to include access, and
// the form would work as intended if I had a paid account.

// Get the form elements
const forms = document.querySelectorAll('.form');

// Assign submit button vraiable to the button with class "submitbutton"
let submitbutton = document.querySelector('.submitbutton');

// Add a submit event listener to the submit button
submitbutton.addEventListener('click', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Validation check
  let isValid = true;
  for (let form of forms) {
    let nameOfSubmission = form.querySelector('input[name="nameofsubmission"]');
    let coordinates = form.querySelector('input[name="coordinates"]');
    if (!nameOfSubmission.value || !coordinates.value) {
      isValid = false;
      alert('Please fill in all required fields.');
      break;
    }
  }

  if (!isValid) {
    return;
  }

  // Create a new form element
  let newForm = document.createElement('form');

  // Append all inputs, selects, and textareas from both forms to newForm
  for (let form of forms) {
    let elements = form.querySelectorAll('input, select, textarea');
    for (let element of elements) {
      newForm.appendChild(element.cloneNode(true));
    }
  }

  // Send the form data using EmailJS
  emailjs.sendForm('service_6fdjmwz', 'template_0zk0ahd', newForm)
    .then(() => {
      // Display an alert message if the email is sent successfully
      alert('Sent!');

    // Clear all form fields
    clearFormFields(forms);
  }, (err) => {
    // Check if the error message matches the one for exceeding the file size limit
    if (err.text === 'Variables size limit. The maximum allowed variables size is 50Kb') {
      // Display a custom error message
      alert('File attachments are not currently available. Please try again without attaching a file.');
    } else {
      // Display the original error message if the user did not submit a file
      alert(JSON.stringify(err));
    }});
  });

// Clear all input fields in both forms except for the submit button
function clearFormFields(forms) {
  // iterate through both forms and assign to a variable to use
  for (let form of forms) {
    const elements = form.elements;
    // loop through each element in the above created variable and set each value to empty
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type !== 'submit') {
        elements[i].value = '';
      }
    }
  }
}