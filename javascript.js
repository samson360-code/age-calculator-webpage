var form = document.getElementsByTagName("form")[0],
    input = document.querySelectorAll("input"),
    output = document.querySelectorAll(".output span"),
    label = document.querySelectorAll("label"),
    error = document.querySelectorAll(".error");
const current = new Date(),
    currentYear = current.getFullYear(),
    currentmonth = 1 + current.getMonth(),
    currentdate = current.getDate();
console.log(currentYear + " " + currentmonth + " " + currentdate);
form.addEventListener('submit', function (event) {
    let flag = true;
    event.preventDefault();
    Array.from(input).forEach((element, index) => {
        if (element.value == "") {
            let attributeValue = label[index].getAttribute("for");
            label[index].classList.add("input-error");
            error[index].innerHTML = attributeValue + " cant be empty";
            element.classList.add("input-error");
            flag = false;
        }
        else {
            switch (index) {
                case 0:
                    if ((element.value < 1 || element.value > 31)) {
                        invalid(0);
                        flag = false;
                    }
                    else if (element.value == 31 && input[1].value!= 4)
                    {
                        invalid(0);
                        error[index].innerHTML =" day  can 31 only at april (4)";
                    }
                    else
                        valid(0);
                    break;
                case 1:
                    if ((element.value < 1 || element.value > 12)) {
                        invalid(1);
                        flag = false;
                    }
                    else
                        valid(1);
                    break;
                case 2:
                    if ((element.value < 1 || element.value > currentYear)) {
                        invalid(2);
                        flag = false;
                    }
                    else
                        valid(2);
                    break;
                default:
                    break;
            }
        }

    });
    if (flag) {
        outputt(input[0].value, input[1].value, input[2].value);
        form.reset();
    }
});

function invalid(index) {
    let attributeValue = label[index].getAttribute("for");
    label[index].classList.add("input-error");
    error[index].innerHTML = "invalid " + attributeValue;
    input[index].classList.add("input-error");
    flag = false;
}
function valid(index) {
    label[index].classList.remove("input-error");
    error[index].innerHTML = "";
    input[index].classList.remove("input-error");
}
function outputt(date, month, year) {
    date = Number(date);
    month = Number(month);
    year = Number(year);
    let mth = 0;
    let dt = 0;
    let yr = 0;
    console.log(currentdate);
    if (month < currentmonth) {
        yr = currentYear - year;
        if (date > currentdate) {
            mth = currentmonth - month - 1;
            dt = 30 - (date - currentdate);
        }
        else {
            mth = currentmonth - month;
            dt = currentdate - date;
        }
    }
    else if (month == currentmonth) {
        if (date < currentdate) {
            yr = currentYear - year;
            mth = month - currentmonth;
            dt = currentdate - date;
        }
        else {
            yr = currentYear - year - 1;
            mth = 11;
            dt = 30 - date - currentdate;
        }
    }
    else {
        yr = currentYear - year - 1;
        if (date > currentdate) {
            mth = 11 - (month - currentmonth);
            dt = 30 - (date - currentdate);
        }
        else {
            mth = 12 - (month - currentmonth);
            dt = currentdate - date;
        }
    }

    output[0].innerHTML = yr;
    output[1].innerHTML = mth;
    output[2].innerHTML = dt;
}