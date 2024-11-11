function openBookingForm(button) {
    var eventTitle = button.getAttribute('data-title');
    var eventPlace = button.getAttribute('data-place');
    var eventDay = button.getAttribute('data-day');
    var eventPrice = button.getAttribute('data-price');
    
    
    document.getElementById('eventTitle').value = eventTitle;
    document.getElementById('eventPlace').value = eventPlace;
    document.getElementById('eventDay').value = eventDay;
    document.getElementById('eventPrice').value = eventPrice;
    
    
    document.getElementById('eventName').value = eventTitle;
    document.getElementById('eventPlaceField').value = eventPlace;
    document.getElementById('eventDayField').value = eventDay;
    document.getElementById('eventPriceField').value = eventPrice;
    
    
    document.getElementById('bookingFormModal').classList.remove('hidden');
  }
  
  
  function closeBookingForm() {
    
    document.getElementById('bookingFormModal').classList.add('hidden');
  }
  
  
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();  
    
    
    const formData = new FormData(this);
    console.log(Object.fromEntries(formData.entries()));
  
    
    
    
    
    closeBookingForm();
  });
  
  

  