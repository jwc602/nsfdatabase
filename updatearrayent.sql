drop function if exists public.uparrent(argid text, argval text, argrorid text);
CREATE OR REPLACE function public.uparrent(argid text, argval text, argrorid text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

DECLARE
  temp VARCHAR;
  _1d_arr VARCHAR[];
  aid bigint;
  _arraid bigint[];
  pids bigint[];
  tempdoi bigint;
  temprorid varchar;
  myval varchar;
BEGIN
temprorid = argrorid;
myval = argval;
select entities.argid into _1d_arr from public.entities where rorid = temprorid;
IF not EXISTS(SELECT 1 FROM entities WHERE myval = any(_1d_arr)) THEN 
	--put code here
	--select publications._authors into _1d_arr from public.publications where pid = temppid;
	_1d_arr = _1d_arr || myval;
	update public.entities set argid = _1d_arr where rorid =temprorid;
end if;


END
$BODY$;

select * from uparrent('_types', 'FED-DOD','https://ror.org/01xyx5098')