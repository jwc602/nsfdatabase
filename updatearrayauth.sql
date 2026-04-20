DO $$
DECLARE
  temp VARCHAR;
  _1d_arr VARCHAR[];
  aid bigint;
  _arraid bigint[];
  pids bigint[];
  tempdoi bigint;
BEGIN
tempname = $1;
myval = $2
select authors.$3 into _1d_arr from public.authors where name = tempname;
IF not EXISTS(SELECT 1 FROM authors WHERE myval = any(_1d_arr)) THEN 
	--put code here
	--select publications._authors into _1d_arr from public.publications where pid = temppid;
	_1d_arr = _1d_arr || myval;
	update public.authors set $3 = _1d_arr where name =tempname;
end if;


END
$$;