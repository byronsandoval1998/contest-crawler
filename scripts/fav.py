import psycopg2
try:

    conn = psycopg2.connect(
                dbname='DATABASE_NAME',
                user='USER',
                password='PASS',
                host='HOS',
                port='POR'
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

except Exception as e:
    print(f"Error: {e}")

print("Favista view created.")