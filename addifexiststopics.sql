--drop function public.addiepub(argid text, argname text, argdoi text);
CREATE OR REPLACE function public.addietop(argtopid text, argsubid text,argfieldid text,argdomid text,argtopname text, argsubname text, argfieldname text, argdomname text)
  returns text --<< this defines the structure of the result 
  LANGUAGE plpgsql
AS 
$BODY$

BEGIN
	--RAISE INFO '% _ % _ %', argid, argname, argdoi;
	IF EXISTS(SELECT 1 FROM topics WHERE topicid= argtopid) THEN 
		update topics set topicname = argtopname, subfieldname = argsubname, fieldname = argfieldname, domainname = argdomname, subfieldid = argsubid, fieldid = argfieldid, domainid = argdomid where topicid = argtopid;
	ELSE 
		insert into topics(topicid,topicname,subfieldid,subfieldname,fieldid,fieldname,domainid,domainname) values(argtopid, argtopname,argsubid, argsubname,argfieldid, argfieldname,argdomid, argdomname);	
	END IF;
	return argtopid;
END 
$BODY$;

--select * from addiepub($1, $2, $3)