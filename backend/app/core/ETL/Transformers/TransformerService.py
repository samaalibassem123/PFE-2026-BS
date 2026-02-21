from collections import defaultdict

from app.core.ETL.Extractors import Biotime_extractor
from app.core.database.models import Department


class TransformerService:
    def tranform_personnel_department(data):
        departments = []
        for dep in data:
            depart = defaultdict()
            depart['id'] = dep['id']
            depart['name'] = dep["dept_name"]
            depart = Department(**depart)
            departments.append(depart)
        return departments