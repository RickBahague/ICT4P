/*
SMS Refund Calculator version 0.3
@Copyright: Computer Professionals' Union
Author: Juan Alejandro Gaite
Support: rick/gladys/mac @cp-union.com
Contact: secretariat@cp-union.com

Campaign Background:

Telco fine for non-compliance:
P200 starting Dec 1, 2011

SMS sent to other network that should cost .8 centavos rather than P1:
2% of 2B SMS/Day

Refund per day:
P8/day

Calculate:
refund_per_second = P8 / day * (1 day / 24h) * (1h / 60 m) * (1m / 60 s)
fine_per_second = P200 / day * (1 day / 24h) * (1h / 60 m) * (1m / 60 s)

ms_elapsed = Current date - (Dec 1, 2011) (in ms)
days_elapsed = ms_elapsed * (1s / 1000ms) * (1 m / 60 s) * (1 h / 60 m) * (1 d / 24 h)
Current_Refund = days_elapsed * P8M
Current_Fine = days_elapsed * P200 * 3 telco

Total Obligation = Current_Fine + Current_Refund

Ref: http://business.inquirer.net/170155/telcos-to-challenge-ntc-refund-order
*/

function startTime()
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // Add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
        today.getDate() +
        "-" +
        (today.getMonth()+1)+"-" +
        today.getFullYear() +
        " "+h+":"+m+":"+s;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    <!-- Code for pending balance per second -->
    var deadline = new Date(2011, 11, 1);
    //var today = new Date(2014,11,31);
    var deadline_in_seconds = Math.round( (today-deadline)/1000 );
    var deadline_in_days = Math.round( (today-deadline)/1000/60/60/24 );

    <!-- Code to calculate fines and refunds per second -->
    var refund_per_second = 8000000.0 / (24*60*60.);
    //var refund_per_second = 18000000.0 / (24*60*60.);
    var fine_per_second = 200.0 / (24.*60.*60.);

    /*
    var unpaid_balance = (deadline_in_seconds * 92);
    var fine = (deadline_in_days * 200);
    var total = unpaid_balance + fine;
    */

    var unpaid_balance = Math.round(refund_per_second * deadline_in_seconds);

    var fine = Math.round(fine_per_second * deadline_in_seconds * 3);

    var total = unpaid_balance + fine;

    var equivalent_sms = unpaid_balance / 0.8;

    var total_users = 106562338;

    var sms_per_user = Math.round(equivalent_sms / total_users);

    document.getElementById('price').innerHTML = "P " + numberWithCommas(total);

    document.getElementById('fine_text').innerHTML = "P " + numberWithCommas(fine)  ;

    document.getElementById('refund_text').innerHTML = "P " + numberWithCommas(unpaid_balance)  ;

    document.getElementById('per_user_refund_sms').innerHTML = "" +numberWithCommas(sms_per_user)  ;

    t = setTimeout(function(){startTime()},500);

}

function checkTime(i)
{
    if (i<10)
    {
        i = "0" + i;
    }
    return i;
}