--drop function if exists public.addieobligg(argrorid text, argalias text, argamount money, argyear int);
--drop function if exists public.addieherdfed(argalias text, argdod money, argdoe money, arghhs money, argnasa money, argnsf money, argusda money, argfedother money, argyear int);
--drop function if exists public.addieherdfed(argalias text, argyear int, argdod money, argdoe money, arghhs money, argnasa money, argnsf money, argusda money, argfedother money, argyear int);
CREATE OR REPLACE function public.addieherdstate(argalias text, argstate money, arginst money, argbusi money, argnonprof money, argallother money, argyear int)
  returns setof obligations --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$
DECLARE
  temp VARCHAR;
  _1d_arr text[];
  aid bigint;
  vareid bigint;
  varname text;
BEGIN

--_1d_arr = ARRAY [ 'University of Science and Technology of China','Sahlgrenska University Hospital','Hong Kong Science and Technology Parks Corporation' ];
--select entities._aliases into _1d_arr from entities where entities.rorid = argrorid;
--select id into levenror from mytable where levenshtein(ror, myror) <=1;
select "EID" into vareid from public.entities where entities.name = argalias or argalias = any(entities._aliases);
select name into varname from public.entities where entities."EID" = vareid;
raise info '%', vareid;
--select name into varname from public.entities where entities.rorid = argrorid; 

--in order for there to be the different entries the year needs to be different or the agency or the amount


IF EXISTS(SELECT 1 FROM obligations WHERE vareid =obligations.eid and argyear = obligations.year) THEN
	update obligations set name = varname, year = argyear, herdstate=argstate, herdinst=arginst, herdbusi=argbusi, herdnonprof=argnonprof, herdallother = argallother WHERE vareid =obligations.eid and argyear = obligations.year; 
else
	insert into obligations(eid,name, year, country, herdstate, herdinst, herdbusi, herdnonprof,herdallother) values(vareid, varname, argyear,'USA',argstate, arginst, argbusi, argnonprof,argallother);
end if;
return;
END
$BODY$;

--select * from addieoblig('https://ror.org/05hz8m414', 'Alabama A&M U.','10,916','2022');
select * from addieherdstate('Johns Hopkins U.','10896000','185200000','133402000','177078000','4624000','2024');