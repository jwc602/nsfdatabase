--drop function public.uparrpubent(argid text, argname text, argdoi text);
CREATE OR REPLACE function public.upcellpub(arg1 text, arg2 text,arg3 text,arg4 text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$
DECLARE
  myval1 varchar;
  myval2 varchar;
  myval3 varchar;
  myval4 varchar;
  
BEGIN
	myval1 = arg1;
	myval2 = arg2;
	myval3 = arg3;
	myval4 = arg4;
	update public.publications set myval1 = myval2 where myval3 = myval4;
	return arg1;
END 
$BODY$;

select * from upcellpub('publicationdate','2023-07-28','openalexid', 'https://openalex.org/W4385330394')