--drop function public.uparrpub(argid text, argname text, argcol text);
CREATE OR REPLACE function public.uparrpub(argid text, argname text, argcol text)
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
  tempcol varchar;
  plswork varchar;
BEGIN
tempdoi = argid;
myval = argname;
tempcol = argcol;
--select publications.argcol into _1d_arr from public.publications where openalexid = tempdoi;
--execute 'select publications.'||tempcol||' into _1d_arr from public.publications where openalexid = ''' || tempdoi || ''';';
execute 'select ' || tempcol || ' from public.publications where openalexid = ''' || tempdoi || ''';' into plswork;
if plswork is not null then
	execute 'select ' || tempcol || ' from public.publications where openalexid = ''' || tempdoi || ''';' into _1d_arr;
else
	_1d_arr = '{"' || myval || '"}';
	--_1d_arr = '{"foo"}';
	--_1d_arr = _1d_arr || myval;
	plswork = _1d_arr;
	execute  'update public.publications set ' || tempcol || '=''' || plswork || ''' where openalexid = ''' || tempdoi || ''';';
	raise info '%', plswork;
	return _1d_arr;
end if;
--_1d_arr = string_to_array(plswork,',');
--EXECUTE 'SELECT '|| get_columns()|| ' FROM table_name' INTO results
IF not EXISTS(SELECT 1 FROM publications WHERE myval = any(_1d_arr)) THEN 
	--put code here
	--select publications._authors into _1d_arr from public.publications where pid = temppid;
	_1d_arr = _1d_arr || myval;
	raise info '%',_1d_arr;
	plswork = _1d_arr;
	--raise info 'update public.publications set % = % where openalexid = %;',tempcol, _1d_arr, tempdoi;
	execute 'update public.publications set ' || tempcol || '=''' || plswork || ''' where openalexid = ''' || tempdoi || ''';';
	--raise info '% _ %',temppid, _arraid;
end if;

return _1d_arr;
END
$BODY$;

--select * from uparrpub('https://openalex.org/W4385330394','https://openalex.org/W2997271239', '_refworks')