from rest_framework import permissions, generics
from rest_framework.response import Response

# importing models
from workshops.models import Workshop
from talks.models import Talk
from proposals.models import Proposal
from patents.models import Patent
from mous.models import Mou
from memberships.models import Membership
from lectures.models import Lecture
from industrial_visits.models import Industrial_visit
from grants.models import Grant
from events.models import Event
from consultancies.models import Consultancy
from conferences.models import Conference
from books.models import Book
from activities.models import Activity
from achievements.models import Achievement
from users.models import User


class AggregateAccessPermission(permissions.BasePermission):
    """
    Permission check for authentication
    """

    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.is_active


def get_book_queryset(role, user, users_in_dept):
    book_list = [{'book_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                 for e in Book.objects.all()]
    res_qs = Book.objects.none()

    if role == "teacher":
        for book in book_list:
            if user in book['faculty_involved']:
                res_qs = res_qs | Book.objects.filter(
                    id=book['book_id'])
        return res_qs

    else:
        for book in book_list:
            for user in users_in_dept:
                if user in book['faculty_involved']:
                    res_qs = res_qs | Book.objects.filter(
                        id=book['book_id'])
        return res_qs


def get_event_queryset(role, user, users_in_dept):
    event_list = [{'event_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                  for e in Event.objects.all()]
    res_qs = Event.objects.none()

    if role == "teacher":
        for event in event_list:
            if user in event['faculty_involved']:
                res_qs = res_qs | Event.objects.filter(
                    id=event['event_id'])
        return res_qs

    else:
        for event in event_list:
            for user in users_in_dept:
                if user in event['faculty_involved']:
                    res_qs = res_qs | Event.objects.filter(
                        id=event['event_id'])
        return res_qs


def get_industrial_visit_queryset(role, user, users_in_dept):
    industrial_visit_list = [{'industrial_visit_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                             for e in Industrial_visit.objects.all()]
    res_qs = Industrial_visit.objects.none()

    if role == "teacher":
        for industrial_visit in industrial_visit_list:
            if user in industrial_visit['faculty_involved']:
                res_qs = res_qs | Industrial_visit.objects.filter(
                    id=industrial_visit['industrial_visit_id'])
        return res_qs

    else:
        for industrial_visit in industrial_visit_list:
            for user in users_in_dept:
                if user in industrial_visit['faculty_involved']:
                    res_qs = res_qs | Industrial_visit.objects.filter(
                        id=industrial_visit['industrial_visit_id'])
        return res_qs


def get_membership_queryset(role, user, users_in_dept):
    membership_list = [{'membership_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                       for e in Membership.objects.all()]
    res_qs = Membership.objects.none()

    if role == "teacher":
        for membership in membership_list:
            if user in membership['faculty_involved']:
                res_qs = res_qs | Membership.objects.filter(
                    id=membership['membership_id'])
        return res_qs

    else:
        for membership in membership_list:
            for user in users_in_dept:
                if user in membership['faculty_involved']:
                    res_qs = res_qs | Membership.objects.filter(
                        id=membership['membership_id'])
        return res_qs


def get_mou_queryset(role, user, users_in_dept):
    mou_list = [{'mou_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                for e in Mou.objects.all()]
    res_qs = Mou.objects.none()

    if role == "teacher":
        for mou in mou_list:
            if user in mou['faculty_involved']:
                res_qs = res_qs | Mou.objects.filter(
                    id=mou['mou_id'])
        return res_qs

    else:
        for mou in mou_list:
            for user in users_in_dept:
                if user in mou['faculty_involved']:
                    res_qs = res_qs | Mou.objects.filter(
                        id=mou['mou_id'])
        return res_qs


def get_patent_queryset(role, user, users_in_dept):
    patent_list = [{'patent_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                   for e in Patent.objects.all()]
    res_qs = Patent.objects.none()

    if role == "teacher":
        for patent in patent_list:
            if user in patent['faculty_involved']:
                res_qs = res_qs | Patent.objects.filter(
                    id=patent['patent_id'])
        return res_qs

    else:
        for patent in patent_list:
            for user in users_in_dept:
                if user in patent['faculty_involved']:
                    res_qs = res_qs | Patent.objects.filter(
                        id=patent['patent_id'])
        return res_qs


def get_workshop_queryset(role, user, users_in_dept):
    workshop_list = [{'workshop_id': e.id, 'faculty_involved': [f for f in e.f_id.all()]}
                     for e in Workshop.objects.all()]
    res_qs = Workshop.objects.none()

    if role == "teacher":
        for workshop in workshop_list:
            if user in workshop['faculty_involved']:
                res_qs = res_qs | Workshop.objects.filter(
                    id=workshop['workshop_id'])
        return res_qs

    else:
        for workshop in workshop_list:
            for user in users_in_dept:
                if user in workshop['faculty_involved']:
                    res_qs = res_qs | Workshop.objects.filter(
                        id=workshop['workshop_id'])
        return res_qs


class AggregateCount(generics.RetrieveAPIView):
    permission_classes = [AggregateAccessPermission]

    def get(self, request):
        """
        Return JSON object containing conditional count of all tables
        """
        user = request.user

        aggregate_list = [{
            "label": "Achievements", "count": ""},
            {"label": "Activities", "count": ""},
            {"label": "Books published", "count": ""},
            {
            "label": "Conference publications", "count": ""},
            {
            "label": "Consultancies", "count": ""},
            {"label": "Events organized", "count": ""},
            {"label": "Grants procured", "count": ""},
            {"label": "Industrial visits", "count": ""},
            {
            "label": "Lectures delivered", "count": ""},
            {
            "label": "Memberships obtained", "count": ""},
            {"label": "MoUs", "count": ""},
            {"label": "Patents published", "count": ""},
            {"label": "Proposals", "count": ""},
            {"label": "Talks delivered", "count": ""},
            {
            "label": "Workshops organized", "count": ""}]

        if user.is_teacher:
            aggregate_list[0]['count'] = Achievement.objects.filter(
                f_id=user).count()
            aggregate_list[1]['count'] = Activity.objects.filter(
                f_id=user).count()
            aggregate_list[2]['count'] = get_book_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_list[3]['count'] = Conference.objects.filter(
                f_id=user).count()
            aggregate_list[4]['count'] = Consultancy.objects.filter(
                f_id=user).count()
            aggregate_list[5]['count'] = get_event_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_list[6]['count'] = (Grant.objects.filter(
                PI=user) | Grant.objects.filter(CO_PI=user)).count()
            aggregate_list[7]['count'] = get_industrial_visit_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_list[8]['count'] = Lecture.objects.filter(
                f_id=user).count()
            aggregate_list[9]['count'] = get_membership_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_list[10]['count'] = get_mou_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_list[11]['count'] = get_patent_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_list[12]['count'] = (Proposal.objects.filter(
                PI=user) | Proposal.objects.filter(CO_PI=user)).count()
            aggregate_list[13]['count'] = Talk.objects.filter(
                f_id=user).count()
            aggregate_list[14]['count'] = get_workshop_queryset(
                "teacher", user, users_in_dept=None).count()

        elif user.is_admin:
            users_in_dept = User.objects.filter(department=user.department)

            aggregate_list[0]['count'] = Achievement.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_list[1]['count'] = Activity.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_list[2]['count'] = get_book_queryset(
                "admin", user, users_in_dept).count()
            aggregate_list[3]['count'] = Conference.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_list[4]['count'] = Consultancy.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_list[5]['count'] = get_event_queryset(
                "admin", user, users_in_dept).count()
            aggregate_list[6]['count'] = (Grant.objects.filter(
                PI__in=users_in_dept) | Grant.objects.filter(
                CO_PI__in=users_in_dept)).count()
            aggregate_list[7]['count'] = get_industrial_visit_queryset(
                "admin", user, users_in_dept).count()
            aggregate_list[8]['count'] = Lecture.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_list[9]['count'] = get_membership_queryset(
                "admin", user, users_in_dept).count()
            aggregate_list[10]['count'] = get_mou_queryset(
                "admin", user, users_in_dept).count()
            aggregate_list[11]['count'] = get_patent_queryset(
                "admin", user, users_in_dept).count()
            aggregate_list[12]['count'] = (Proposal.objects.filter(
                PI__in=users_in_dept) | Proposal.objects.filter(
                CO_PI__in=users_in_dept)).count()
            aggregate_list[13]['count'] = Talk.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_list[14]['count'] = get_workshop_queryset(
                "admin", user, users_in_dept).count()

        else:
            aggregate_list[0]['count'] = Achievement.objects.count()
            aggregate_list[1]['count'] = Activity.objects.count()
            aggregate_list[2]['count'] = Book.objects.count()
            aggregate_list[3]['count'] = Conference.objects.count()
            aggregate_list[4]['count'] = Consultancy.objects.count()
            aggregate_list[5]['count'] = Event.objects.count()
            aggregate_list[6]['count'] = Grant.objects.count()
            aggregate_list[7]['count'] = Industrial_visit.objects.count()
            aggregate_list[8]['count'] = Lecture.objects.count()
            aggregate_list[9]['count'] = Membership.objects.count()
            aggregate_list[10]['count'] = Mou.objects.count()
            aggregate_list[11]['count'] = Patent.objects.count()
            aggregate_list[12]['count'] = Proposal.objects.count()
            aggregate_list[13]['count'] = Talk.objects.count()
            aggregate_list[14]['count'] = Workshop.objects.count()

        return Response({"values": aggregate_list})
