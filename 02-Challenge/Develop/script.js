$(document).ready(function() {
  // Use Day.js to get current date and display it
  $('#currentDay').text(dayjs().format('MMMM D, YYYY'));

  // Create time blocks
  for (let i = 0; i < 24; i++) {
    let timeBlock = createHourlyTimeBlock(i);
    $('#time-blocks').append(timeBlock);
  }

  // Add event listener to save button
  $('.saveBtn').on('click', function() {
    let hour = $(this).parent().attr('id').split('-')[1];
    let text = $(this).siblings('textarea').val();
    localStorage.setItem(hour, text);
  });

  // Function to create hourly time block
  function createHourlyTimeBlock(hour) {
    // Create new row
    let newTimeBlock = $('<div>').addClass('row time-block').attr('id', 'hour-' + hour);

    // Create hour element
    let hourEl = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(moment(hour, 'H').format('hA'));

    // Create textarea element
    let textEl = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);

    // Get text from local storage if any
    let text = localStorage.getItem(hour);
    if (text) {
      textEl.text(text);
    }

    // Create save button element
    let saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').html('<i class="fas fa-save"></i>');

    // Append hour, textarea and save button to the new time block
    newTimeBlock.append(hourEl, textEl, saveBtn);

    // Determine whether the time block is in the past, present or future
    let currentHour = dayjs().hour();
    if (hour < currentHour) {
      newTimeBlock.addClass('past');
    } else if (hour > currentHour) {
      newTimeBlock.addClass('future');
    } else {
      newTimeBlock.addClass('present');
    }

    return newTimeBlock;
  }
});
