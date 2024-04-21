export function validate(input, min, max, required) {
  
  const type = input.getAttribute('type');
    
  input.addEventListener('keyup', () => {
      
        const value = input.value;
        const length = value.length;
        const style = input.style;
        
        
      if(length > max || length < min ) {
        style.borderColor = 'red';
      } else {
        style.borderColor = 'revert';
      }
      
  })
}