DO $$
DECLARE
  temp VARCHAR;
  _1d_arr VARCHAR[];
  aid bigint;
  _arraid bigint[];
  pids bigint[];
  tempdoi bigint;
BEGIN
tempdoi = $1;
myval = $2;
select publications._authors into _1d_arr from public.publications where doi = tempdoi;
IF not EXISTS(SELECT 1 FROM publications WHERE myval = any(_1d_arr)) THEN 
	--put code here
	--select publications._authors into _1d_arr from public.publications where pid = temppid;
	_1d_arr = _1d_arr || myval;
	update public.publications set _authors = _1d_arr where doi =tempdoi;
	select authors."AID" into aid from public.authors where name = myval
	select publications._authorsaid into _arraid from public.publications where doi = tempdoi;
	_arraid = _arraid || aid;
	update public.publications set _authorsaid = _arraid where doi =tempdoi;
end if;


END
$$;