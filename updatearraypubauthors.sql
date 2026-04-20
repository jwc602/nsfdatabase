drop function public.uparrpubauth(argid text, argauthid text);
CREATE OR REPLACE function public.uparrpubauth(argid text, argauthid text)
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
  tempdoi varchar;
  myval varchar;
BEGIN
tempdoi = argid;
myval = argauthid;
select authors."AID" into aid from public.authors where openalexid = myval;
select publications._authorsaid into _arraid from public.publications where openalexid = tempdoi;
IF not EXISTS(SELECT 1 FROM publications WHERE aid = any(_arraid)) THEN 
	--put code here
	--select publications._authors into _1d_arr from public.publications where pid = temppid;
	_arraid = _arraid || aid;
	update public.publications set _authorsaid = _arraid where openalexid =tempdoi;
	select authors.name into temp from public.authors where "AID" = aid;
	select publications._authors into _1d_arr from public.publications where openalexid = tempdoi;
	_1d_arr = _1d_arr || temp;
	update public.publications set _authors = _1d_arr where openalexid =tempdoi;
end if;

	return temp;
END 
$BODY$;

--select * from uparrpubauth('https://openalex.org/W4385330394', 'https://openalex.org/A5050029751')