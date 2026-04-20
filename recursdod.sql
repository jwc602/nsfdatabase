CREATE OR REPLACE function public.master_todo("actiontype" text, "actionvalue" bigint)
  returns setof entities --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$
DECLARE
  temp VARCHAR;
  _1d_arr VARCHAR[];
  aid bigint;
  _arraid bigint[];
  pids bigint[];
  temppid bigint;
  _rorids varchar[];
  tempror varchar;
  _temparrror varchar[];
BEGIN
--select array_agg(entities.rorid order by "EID") into _rorids from public.entities where levenshtein("actiontype", flatparent) <= 1;
select _childror into _rorids from public.entities where rorid = "actiontype";
if "actionvalue" = 0 then
	return query select distinct * from entities where rorid = "actiontype" order by "EID";
	select _relatedror into _temparrror from public.entities where rorid = "actiontype";
	_rorids = _rorids || _temparrror;
end if;

if array_length(_rorids,1) > 0 then
	--return query select distinct * from entities where rorid = "actiontype" order by "EID";
	foreach tempror slice 0 in array _rorids loop
		raise info '% _ %',tempror, "actionvalue";
		return query select distinct * from entities where rorid = tempror order by "EID";
		return query select distinct * from master_todo(tempror, "actionvalue"+1) order by "EID";

	  end loop;
  end if;
END
$BODY$;

select * from master_todo('https://ror.org/00za53h95', 0);
