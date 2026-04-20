--drop function public.uparrpubauthafill(argid text, argauthid text, argrorid text);
CREATE OR REPLACE function public.uparrpubauthafill(argid text, argauthid text, argrorid text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

DECLARE
  temp VARCHAR;
  _1d_arr VARCHAR[];
  aid bigint;
  eid bigint;
  _arraid bigint[];
  _afillids bigint[];
  tempdoi varchar;
  myval varchar;
BEGIN
tempdoi = argid;
myval = argauthid;
select entities."EID" into eid from public.entities where rorid = argrorid;
select publications._authorsafilleid into _afillids from public.publications where openalexid = tempdoi;
IF not EXISTS(SELECT 1 FROM publications WHERE aid = any(_afillids)) THEN 
	--put code here
	--select publications._authors into _1d_arr from public.publications where pid = temppid;
	_afillids = _afillids || eid;
	update public.publications set _authorsafilleid = _afillids where openalexid =tempdoi;
	select entities.name into temp from public.entities where "EID" = eid;
	select publications._authorsafill into _1d_arr from public.publications where openalexid = tempdoi;
	_1d_arr = _1d_arr || temp;
	update public.publications set _authorsafill = _1d_arr where openalexid =tempdoi;
end if;

	return _1d_arr;
END 
$BODY$;

--select * from uparrpubauthafill('https://openalex.org/W4385330394', 'https://openalex.org/A5050029751','https://ror.org/05tkyf982')