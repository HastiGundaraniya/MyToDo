function ValidationL(data) {
    let error = {};
    const email_regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&?]).{6,20}$/;

    if (data.email === "") {
        error.email = "email should not be empty";
    } else if (!email_regex.test(data.email)) {
        error.email = "please enter valid email address";
    } else {
        error.email = "";
    }

    if (data.pass === "") {
        error.pass = "please enter password";
    } else if (!password_regex.test(data.pass)) {
        error.pass = "please enter 8 character and at least one capital & small alphabet, number, symbol.";
    } else {
        error.pass = "";
    }

    return error;
}

export default ValidationL;
