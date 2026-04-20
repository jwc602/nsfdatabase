--drop function public.uparrpubent(argid text, argname text, argdoi text);
CREATE OR REPLACE function public.uparrpubent(argid text, argentid text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

DECLARE
  temp VARCHAR;
  _1d_arr VARCHAR[];
  aid bigint;
  _arraid bigint[];
  _pids bigint[];
  tempdoi varchar;
  myval varchar;
BEGIN
tempdoi = argid;
myval = argentid;
select entities."EID" into aid from public.entities where openalexid = myval;
select publications._authorsafilleid into _arraid from public.publications where openalexid = tempdoi;
IF not EXISTS(SELECT 1 FROM publications WHERE aid = any(_arraid)) THEN 
	--put code here
	--select publications._authors into _1d_arr from public.publications where pid = temppid;
	_arraid = _arraid || aid;
	update public.publications set _authorsafilleid = _arraid where openalexid =tempdoi;
	select entities.name into temp from public.entities where "EID" = aid;
	select publications._authorsafill into _1d_arr from public.publications where openalexid = tempdoi;
	_1d_arr = _1d_arr || temp;
	update public.publications set _authorsafill = _1d_arr where openalexid =tempdoi;
end if;

	return temp;
END 
$BODY$;

--select * from uparrpubent('https://openalex.org/W4385330394', 'https://openalex.org/I124227911')