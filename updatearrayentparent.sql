drop function if exists public.uparrentparent(argid text, argentparentid text, argentparentror text);
CREATE OR REPLACE function public.uparrentparent(argid text, argentparentid text, argentparentror text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

DECLARE
  temp VARCHAR;
  _1d_arr VARCHAR[];
  eid bigint;
  _arraid bigint[];
  _pids bigint[];
  tempdoi varchar;
  myval varchar;
  myror varchar;
  _temprors varchar[];
  _tempids varchar[];
  levenror bigint;
BEGIN
tempdoi = argid;
myval = argentparentid;
myror = argentparentror;
select entities."EID" into eid from public.entities where openalexid = tempdoi;
select entities._parentror into _temprors from public.entities where openalexid = tempdoi;
select entities._parentid into _tempids from public.entities where openalexid = tempdoi;
raise info '%', _temprors;
--select array_agg(entities.rorid order by "EID") into _rorids from public.entities where levenshtein("actiontype", flatparent) <= 1;
--perform unnest(ARRAY[1,2]);
drop table if exists mytable;
CREATE TEMP TABLE mytable AS SELECT UNNEST(_temprors) AS ror;
ALTER TABLE mytable ADD COLUMN ID SERIAL PRIMARY KEY;
--return query select * from employees;
--IF not EXISTS(SELECT 1 FROM publications WHERE aid = any(_arraid)) THEN 
IF exists (select 1 from mytable where levenshtein(ror, myror) <=1) and exists(select 1 from mytable where levenshtein(ror, myror) > 0) THEN
	select id into levenror from mytable where levenshtein(ror, myror) <=1;
	raise info 'so we got here_%',levenror;
	update mytable set ror = myror where id = levenror;
	select array_agg(mytable.ror) into _temprors from mytable;
	raise info '%', _temprors;
	update entities set _parentror = _temprors where openalexid = tempdoi;
elsif exists(select 1 from mytable where levenshtein(ror, myror) > 0) then
	--raise info 'borked';
	_temprors = _temprors || myror;
	update entities set _parentror = _temprors where openalexid = tempdoi;
end if;
if not exists(select 1 from entities where myval = any(_tempids)) then
	_tempids = _tempids || myval;
	update entities set _parentid = _tempids where openalexid = tempdoi;
end if;
	return temp;
END 
$BODY$;

--select * from uparrentparent('https://openalex.org/I1330347796','https://openalex.org/I1279970786', 'https://ror.org/01xyx5098')