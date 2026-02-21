from app.core.ETL.Extractors import Biotime_extractor
from app.core.database.models import Department


class TransformerService:
    def tranform_personnel_department(self, data):
        departments = []
        for dep in data:
            depart = Department(data['id'], data['dep_name'])
            departments.append(depart)
        return departments