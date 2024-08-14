const TimeFormat = ({time}) => {

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]


      let mmddhm ="";
      let pm = "am";
      let timecreated = new Date(time)
      let datemonth = month[timecreated.getMonth()];
      let dateday = timecreated.getDate();
      let dateHour = timecreated.getHours() ;
      let dateMinutes = timecreated.getMinutes() ;

      if(dateHour > 12){
        dateHour = dateHour-12;
        pm = "pm";
      }
      if(dateMinutes < 10){
        dateMinutes = "0"+ dateMinutes;
      }
       mmddhm =  datemonth+" "+dateday+", "+dateHour +":"+dateMinutes+ " "+pm;
    //   console.log("this is modified dates", mmddyy);
    

        return (
          <div id="time">
            {mmddhm}
          </div>
        );
      };
      
      export default TimeFormat;