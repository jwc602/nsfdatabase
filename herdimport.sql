--drop function if exists public.addieobligg(argrorid text, argalias text, argamount money, argyear int);
CREATE OR REPLACE function public.addieherd(argalias text, argamount money, argyear int, argdod money, argdoe money, arghhs money, argnasa money, argnsf money, argusda money, argfedother money, argstate money, arginst money, argbusi money, argnonprof money, argallother money, )
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
select entities._aliases into _1d_arr from entities where entities.rorid = argrorid;
--select id into levenror from mytable where levenshtein(ror, myror) <=1;
select "EID" into vareid from public.entities where entities.name = argalias or argalias = any(entities._aliases);

select name into varname from public.entities where entities.rorid = argrorid; 

--in order for there to be the different entries the year needs to be different or the agency or the amount
if not exists(select 1 from entities where argalias = any(_1d_arr)) then
	_1d_arr = _1d_arr || argalias;
	--_1d_arr = array_append(_1d_arr, argalias);
	raise info '%', _1d_arr;
	update entities set _aliases = _1d_arr where entities.rorid = argrorid;
end if;

IF EXISTS(SELECT 1 FROM obligations WHERE vareid =obligations.eid and argyear = obligations.year and argamount = obligations.amount) THEN
	update obligations set name = varname, amount = argamount, year = argyear, herddod=argdod, herddoe=argdoe, herdhhs=arghhs, herdnasa=argnasa, herdnsf = argnsf, herdusda = argusda, herdfedother=argfedother, herdstate = argstate, herdinst = arginst, herdbusi = argbusi, herdnonprof = argnonprof, herdallother = argallother WHERE vareid =obligations.eid and argyear = obligations.year; 
else
	insert into obligations(eid,name,amount,year,country) values(vareid, varname, argamount,argyear,'USA');
end if;
return;
END
$BODY$;

--select * from addieoblig('https://ror.org/05hz8m414', 'Alabama A&M U.','10,916','2022');
select * from addieherd('https://ror.org/05hz8m414', 'Alabama A&M U.','10,916','2022');