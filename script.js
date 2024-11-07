if (typeof document !== 'undefined') {
    // Get references to the form and display area
    var form = document.getElementById('resume-form');
    var resumeDisplayElement_1 = document.getElementById('resume-display');
    var shareableLinkContainer_1 = document.getElementById('shareable-link-container');
    var shareableLinkElement_1 = document.getElementById('shareable-link');
    var downloadPdfButton = document.getElementById('download-pdf');
    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Collect input values
        var username = document.getElementById('username').value;
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value;
        // Save form data in localStorage with the username as the key
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills,
        };
        localStorage.setItem(username, JSON.stringify(resumeData));
        // Generate the resume content dynamically
        var resumeHTML = "\n      <h2>Editable Resume</h2>\n      <h3>Personal Information</h3>\n      <p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n      <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n      <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n      <h3>Education</h3>\n      <p contenteditable=\"true\">").concat(education, "</p>\n      <h3>Experience</h3>\n      <p contenteditable=\"true\">").concat(experience, "</p>\n      <h3>Skills</h3>\n      <p contenteditable=\"true\">").concat(skills, "</p>\n    ");
        // Display the generated resume
        resumeDisplayElement_1.innerHTML = resumeHTML;
        // Generate a shareable URL with the username only
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display the shareable link
        shareableLinkContainer_1.style.display = 'block';
        shareableLinkElement_1.href = shareableURL;
        shareableLinkElement_1.textContent = shareableURL;
    });
    // Handle PDF download with html2pdf.js
    downloadPdfButton.addEventListener('click', function () {
        var options = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        // @ts-ignore: html2pdf is assumed to be loaded in HTML file
        html2pdf().set(options).from(resumeDisplayElement_1).save();
    });
    // Prefill the form based on the username in the URL
    window.addEventListener('DOMContentLoaded', function () {
        var urlParams = new URLSearchParams(window.location.search);
        var username = urlParams.get('username');
        if (username) {
            // Autofill form if data is found in localStorage
            var savedResumeData = localStorage.getItem(username);
            if (savedResumeData) {
                var resumeData = JSON.parse(savedResumeData);
                document.getElementById('username').value = username;
                document.getElementById('name').value = resumeData.name;
                document.getElementById('email').value = resumeData.email;
                document.getElementById('phone').value = resumeData.phone;
                document.getElementById('education').value = resumeData.education;
                document.getElementById('experience').value = resumeData.experience;
                document.getElementById('skills').value = resumeData.skills;
            }
        }
    });
}
