--drop function public.addieauth(argid text, argname text, argorcid text);
CREATE OR REPLACE function public.addieauth(argid text, argname text, argorcid text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

BEGIN
	RAISE INFO '% _ % _ %', argid, argname,argorcid;
	IF EXISTS(SELECT 1 FROM authors WHERE openalexid= argid) THEN 
		update authors set name = argname, orcid = argorcid where openalexid = argid;
	ELSE 
		IF EXISTS(SELECT 1 FROM authors WHERE orcid=argorcid and orcid is not null) THEN 
			update authors set name = argname, openalexid = argid where orcid =argorcid;
		else
			insert into authors(openalexid,name,orcid) values(argid, argname, argorcid);
		end if;	
	END IF;
	return argid;
END 
$BODY$;

--select * from addieauth('https://openalex.org/A5050029751','Ofra Novoplansky' , 'https://orcid.org/0000-0002-1239-7856')