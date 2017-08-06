/* 
***************************************************
 
Campaign Call Tracking
 
Stores the original source of a visitor by reading the 'campaign code' of the 'campaign' URL 
parameter of the incoming link (eg. www.domain.com/page.html?campaign=CAMPAIGNPARAMETER). Phone 
number is updated based on campaign code.
 
To track a new campaign, add another case to the switch statement.
 
***************************************************
*/
 
// Function to read URL parameters
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "NULL" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
 
// Get the value for the parameter named campaign
var param = getParameterByName('campaign');
 
// Function to store campaign parameter as cookie
function setCampaign(param)
{
    var d = new Date();
    d.setTime(d.getTime()+(30*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = "campaign=" + param + "; " + expires + "; path=/";
}
 
// Store the campaign cookie if it doesnt exist yet (new visitors)
if (document.cookie.indexOf("campaign") < 0) 
{
     setCampaign(param);
}
 
// Function to read the campaign parameter from campaign cookie
function getCampaign()
{
     var name = "campaign=";
     var ca = document.cookie.split(';');
     for(var i=0; i<ca.length; i++) 
     {
         var c = ca[i].trim();
         if (c.indexOf(name)==0) return c.substring(name.length,c.length);
     }
     return "";
}
 
// Read the campaign parameter
var campaignCode =  getCampaign();
 
// Return correct number based on campaign code
switch (campaignCode)
{
     case 'abc':
         phoneNum = "(555) 555-5asdasdfsadf01";
         break;
     case 'AdWordsCampaignName':
         phoneNum = "(555) 555-5502";
         break;
}
 
//replace ID contents with campaign phone number
if(getCampaign() != 'NULL') 
{
     document.getElementById('phone').innerHTML  =  phoneNum;
}
 
//end script
