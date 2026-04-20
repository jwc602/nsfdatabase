DO $$
DECLARE
  temp VARCHAR;
  _1d_arr VARCHAR[];
  aid bigint;
  _arraid bigint[];
  pids bigint[];
  temppid bigint;
BEGIN
select array_agg(publications.pid order by pid) into pids from public.publications where _authors is not null;
foreach temppid slice 0 in array pids loop
	select publications._authors into _1d_arr from public.publications where pid = temppid;
	raise info '%',_1d_arr;
  	FOREACH temp SLICE 0 IN ARRAY _1d_arr LOOP
    	--RAISE INFO '%', temp;
	 	select "AID" into aid from public.authors where name = temp;
	 	_arraid = _arraid || aid;
	 	--RAISE INFO '% _ %', temp, aid;
  	END LOOP;
  --raise info '% _ %',temppid, _arraid;
  update public.publications set _authorsaid = _arraid where pid =temppid ;
  select publications._authorsaid into _arraid from public.publications where pid = temppid;
  --raise info '%', _arraid;
  _arraid = '{}';
  end loop;
END
$$;