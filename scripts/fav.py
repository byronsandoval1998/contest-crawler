import psycopg2
import os

try:

    conn = psycopg2.connect(
                dbname=os.getenv('DATABASE_NAME'),
                user=os.getenv('USER'),
                password=os.getenv('PASS'),
                host=os.getenv('HOS'),
                port=os.getenv('POR')
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