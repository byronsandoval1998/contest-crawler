import psycopg2

conn = psycopg2.connect(
                dbname="crawler_db",
                user="dev",
                password="Energizer2048!",
                host="192.168.50.193",
                port="5432"
            )

create_view_sql = """
CREATE OR REPLACE VIEW favista AS
SELECT *
FROM favorite
WHERE pdate >= current_date;
"""

cursor = conn.cursor()
cursor.execute(create_view_sql)
conn.commit()

conn.close()

print("Favista view created.")