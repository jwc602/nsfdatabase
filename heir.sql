drop function if exists public.heir(argid text);
CREATE OR REPLACE function public.heir(argid text)
  returns setof entities --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

DECLARE
  eid bigint;
  tempdoi varchar;
  myval varchar;
  _tempids varchar[];
  _testids varchar[];
BEGIN
return query select distinct * from master_todo(argid, 0);
END 
$BODY$;

select * from heir('https://ror.org/00za53h95')