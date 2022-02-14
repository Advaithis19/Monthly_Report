from rest_framework import permissions, generics
from rest_framework.response import Response

# importing models
from users.models import User
from achievements.models import Achievement
from activities.models import Activity
from books.models import Book
from conferences.models import Conference
from consultancies.models import Consultancy
from events.models import Event
from grants.models import Grant
from industrial_visits.models import Industrial_visit
from lectures.models import Lecture
from memberships.models import Membership
from mous.models import Mou
from patents.models import Patent
from proposals.models import Proposal
from talks.models import Talk
from workshops.models import Workshop


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
        aggregate_obj = {}

        if user.is_teacher:
            aggregate_obj['count_achievements'] = Achievement.objects.filter(
                f_id=user).count()
            aggregate_obj['count_activities'] = Activity.objects.filter(
                f_id=user).count()
            aggregate_obj['count_books'] = get_book_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_obj['count_conferences'] = Conference.objects.filter(
                f_id=user).count()
            aggregate_obj['count_consultancies'] = Consultancy.objects.filter(
                f_id=user).count()
            aggregate_obj['count_events'] = get_event_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_obj['count_grant'] = (Grant.objects.filter(
                PI=user) | Grant.objects.filter(CO_PI=user)).count()
            aggregate_obj['count_visits'] = get_industrial_visit_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_obj['count_lectures'] = Lecture.objects.filter(
                f_id=user).count()
            aggregate_obj['count_memberships'] = get_membership_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_obj['count_mous'] = get_mou_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_obj['count_patents'] = get_patent_queryset(
                "teacher", user, users_in_dept=None).count()
            aggregate_obj['count_proposals'] = (Proposal.objects.filter(
                PI=user) | Proposal.objects.filter(CO_PI=user)).count()
            aggregate_obj['count_talks'] = Talk.objects.filter(
                f_id=user).count()
            aggregate_obj['count_workshops'] = get_workshop_queryset(
                "teacher", user, users_in_dept=None).count()

        elif user.is_admin:
            users_in_dept = User.objects.filter(department=user.department)

            aggregate_obj['count_achievements'] = Achievement.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_obj['count_activities'] = Activity.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_obj['count_books'] = get_book_queryset(
                "admin", user, users_in_dept).count()
            aggregate_obj['count_conferences'] = Conference.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_obj['count_consultancies'] = Consultancy.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_obj['count_events'] = get_event_queryset(
                "admin", user, users_in_dept).count()
            aggregate_obj['count_grant'] = (Grant.objects.filter(
                PI__in=users_in_dept) | Grant.objects.filter(
                CO_PI__in=users_in_dept)).count()
            aggregate_obj['count_visits'] = get_industrial_visit_queryset(
                "admin", user, users_in_dept).count()
            aggregate_obj['count_lectures'] = Lecture.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_obj['count_memberships'] = get_membership_queryset(
                "admin", user, users_in_dept).count()
            aggregate_obj['count_mous'] = get_mou_queryset(
                "admin", user, users_in_dept).count()
            aggregate_obj['count_patents'] = get_patent_queryset(
                "admin", user, users_in_dept).count()
            aggregate_obj['count_proposals'] = (Proposal.objects.filter(
                PI__in=users_in_dept) | Proposal.objects.filter(
                CO_PI__in=users_in_dept)).count()
            aggregate_obj['count_talks'] = Talk.objects.filter(
                f_id__in=users_in_dept).count()
            aggregate_obj['count_workshops'] = get_workshop_queryset(
                "admin", user, users_in_dept).count()

        else:
            aggregate_obj['count_achievements'] = Achievement.objects.count()
            aggregate_obj['count_activities'] = Activity.objects.count()
            aggregate_obj['count_books'] = Book.objects.count()
            aggregate_obj['count_conferences'] = Conference.objects.count()
            aggregate_obj['count_consultancies'] = Consultancy.objects.count()
            aggregate_obj['count_events'] = Event.objects.count()
            aggregate_obj['count_grant'] = Grant.objects.count()
            aggregate_obj['count_visits'] = Industrial_visit.objects.count()
            aggregate_obj['count_lectures'] = Lecture.objects.count()
            aggregate_obj['count_memberships'] = Membership.objects.count()
            aggregate_obj['count_mous'] = Mou.objects.count()
            aggregate_obj['count_patents'] = Patent.objects.count()
            aggregate_obj['count_proposals'] = Proposal.objects.count()
            aggregate_obj['count_talks'] = Talk.objects.count()
            aggregate_obj['count_workshops'] = Workshop.objects.count()

        return Response(aggregate_obj)
