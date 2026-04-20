
DO $do$ 
BEGIN
	IF EXISTS(SELECT 1 FROM entities WHERE rorid= $1) THEN 
		update entities set name = $2 where rorid = $1;
	ELSE 
		insert into entities(rorid,name) values($1, $2); 
	END IF; 
END 
$do$

