--drop function public.uparrpubent(argid text, argname text, argdoi text);
CREATE OR REPLACE function public.uparrpubtop(argid text, argtopid1 text, argtopid2 text, argtopid3 text)
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
  temppid bigint;
BEGIN
	select topics.tid into temppid from public.topics where topicid = argtopid1;
	update public.publications set tid = temppid where openalexid = argid;
	select topics.tid into temppid from public.topics where topicid = argtopid2;
	update public.publications set tid2 = temppid where openalexid = argid;
	select topics.tid into temppid from public.topics where topicid = argtopid3;
	update public.publications set tid3 = temppid where openalexid = argid;
	return argid;
END

$BODY$;

--select * from uparrpubtop('https://openalex.org/W4385330394', 'https://openalex.org/T10417','https://openalex.org/T10952','https://openalex.org/T13779')