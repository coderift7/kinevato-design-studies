document.querySelectorAll('.preview-form').forEach(form => {
 const result=form.querySelector('.form-result'); const submit=form.querySelector('.preview-submit'); submit.disabled=false;
 form.addEventListener('submit',event=>{event.preventDefault();
  for(const field of form.querySelectorAll('input,textarea')) {field.value=field.value.trim();field.setCustomValidity(field.minLength>0 && field.value.length<field.minLength ? `Bitte mindestens ${field.minLength} Zeichen eingeben.` : "");}
  if(!form.reportValidity()) return;
  const list=result.querySelector('dl'); list.replaceChildren();
  for(const [key,value] of new FormData(form)) {const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;row.append(dt,dd);list.append(row);}
  result.hidden=false;result.focus();
 });
 form.addEventListener('input',event=>{result.hidden=true;if(event.target.setCustomValidity) event.target.setCustomValidity('');});
 form.querySelector('.form-edit').addEventListener('click',()=>{result.hidden=true;form.querySelector('textarea,select,input').focus();});
});